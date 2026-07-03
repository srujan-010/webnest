import { Request, Response } from 'express';
import { Model } from 'mongoose';
import AuditLog from '../models/AuditLog';

export function createCrudController(Model: Model<any>, modelName: string, options?: { populate?: string | string[] }) {
  const getAll = async (req: Request, res: Response) => {
    try {
      const { trash, page = 1, limit = 50, search } = req.query;
      const filter: Record<string, any> = trash === 'true'
        ? { isDeleted: true }
        : { isDeleted: { $ne: true } };

      if (search) {
        filter.$or = [
          { name: { $regex: search, $options: 'i' } },
          { title: { $regex: search, $options: 'i' } },
          { question: { $regex: search, $options: 'i' } },
        ];
      }

      const skip = (Number(page) - 1) * Number(limit);
      let query = Model.find(filter).sort({ order: 1, createdAt: -1 }).skip(skip).limit(Number(limit));
      if (options?.populate) {
        query = query.populate(options.populate as any);
      }

      const [data, total] = await Promise.all([
        query,
        Model.countDocuments(filter),
      ]);

      return res.status(200).json({ success: true, data, total, page: Number(page), limit: Number(limit) });
    } catch (err: any) {
      return res.status(500).json({ success: false, message: err.message });
    }
  };

  const getById = async (req: Request, res: Response) => {
    try {
      let item = null;
      if (/^[0-9a-fA-F]{24}$/.test(req.params.id as string)) {
        let query = Model.findById(req.params.id);
        if (options?.populate) {
          query = query.populate(options.populate as any);
        }
        item = await query;
      }
      
      // Fallback: Try searching by slug if slug exists on the schema
      if (!item && Model.schema.path('slug')) {
        let query = Model.findOne({ slug: req.params.id });
        if (options?.populate) {
          query = query.populate(options.populate as any);
        }
        item = await query;
      }

      if (!item) return res.status(404).json({ success: false, message: `${modelName} not found.` });
      return res.status(200).json({ success: true, data: item });
    } catch (err: any) {
      return res.status(500).json({ success: false, message: err.message });
    }
  };

  const create = async (req: any, res: Response) => {
    try {
      let item = await Model.create(req.body);
      if (options?.populate) {
        item = await item.populate(options.populate as any);
      }
      await AuditLog.create({
        userId: req.user._id,
        userEmail: req.user.email,
        action: 'create',
        model: modelName,
        recordId: item._id.toString(),
        summary: `Created new ${modelName}: ${item.name || item.title || item.question || item._id}`,
      });
      return res.status(201).json({ success: true, data: item });
    } catch (err: any) {
      return res.status(400).json({ success: false, message: err.message });
    }
  };

  const update = async (req: any, res: Response) => {
    try {
      console.log(`📥 [CRUD Update] Received PUT request for ${modelName} ID: ${req.params.id}`);
      console.log(`📥 [CRUD Update] Request payload:`, JSON.stringify(req.body, null, 2));

      const before = await Model.findById(req.params.id);
      if (!before) {
        console.warn(`⚠️ [CRUD Update] ${modelName} ID: ${req.params.id} not found.`);
        return res.status(404).json({ success: false, message: `${modelName} not found.` });
      }

      const beforeLean = before.toObject();
      console.log(`📄 [CRUD Update] MongoDB document BEFORE update:`, JSON.stringify(beforeLean, null, 2));

      // Update fields
      for (const key in req.body) {
        if (req.body.hasOwnProperty(key)) {
          before.set(key, req.body[key]);
        }
      }

      // Save document (triggers pre('save') hooks!)
      let item = await before.save();
      if (options?.populate) {
        item = await item.populate(options.populate as any);
      }
      const after = item.toObject();

      console.log(`📄 [CRUD Update] MongoDB document AFTER update (and hook sync):`, JSON.stringify(after, null, 2));

      // Trigger Next.js revalidation
      const revalidateUrl = `${process.env.CLIENT_URL || 'http://localhost:3000'}/api/revalidate`;
      try {
        console.log(`📡 [CRUD Update] Triggering Next.js cache revalidation at: ${revalidateUrl}`);
        const revRes = await fetch(revalidateUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ secret: process.env.REVALIDATION_SECRET, tags: ['all'] }),
        });
        console.log(`📡 [CRUD Update] Next.js cache revalidation status:`, revRes.status);
      } catch (revErr: any) {
        console.warn(`📡 [CRUD Update] Next.js cache revalidation failed:`, revErr.message);
      }

      await AuditLog.create({
        userId: req.user._id,
        userEmail: req.user.email,
        action: 'update',
        model: modelName,
        recordId: item._id.toString(),
        summary: `Updated ${modelName}: ${item.name || item.title || item.question || item._id}`,
        diff: { before: beforeLean, after },
      });

      console.log(`📤 [CRUD Update] Returning success response to client.`);
      return res.status(200).json({ success: true, data: item });
    } catch (err: any) {
      console.error(`❌ [CRUD Update] Update failed:`, err);
      return res.status(400).json({ success: false, message: err.message });
    }
  };

  const remove = async (req: any, res: Response) => {
    try {
      const { hard } = req.query;
      const item = await Model.findById(req.params.id);
      if (!item) return res.status(404).json({ success: false, message: `${modelName} not found.` });

      if (hard === 'true' && req.user.role === 'admin') {
        await Model.findByIdAndDelete(req.params.id);
        await AuditLog.create({
          userId: req.user._id, userEmail: req.user.email, action: 'delete',
          model: modelName, recordId: req.params.id,
          summary: `Hard deleted ${modelName}: ${item.name || item.title || item._id}`,
        });
        return res.status(200).json({ success: true, message: 'Permanently deleted.' });
      }

      await Model.findByIdAndUpdate(req.params.id, { isDeleted: true, deletedAt: new Date() });
      await AuditLog.create({
        userId: req.user._id, userEmail: req.user.email, action: 'delete',
        model: modelName, recordId: req.params.id,
        summary: `Soft deleted ${modelName}: ${item.name || item.title || item._id}`,
      });
      return res.status(200).json({ success: true, message: 'Moved to trash.' });
    } catch (err: any) {
      return res.status(500).json({ success: false, message: err.message });
    }
  };

  const restore = async (req: any, res: Response) => {
    try {
      const item = await Model.findByIdAndUpdate(
        req.params.id, { isDeleted: false, $unset: { deletedAt: '' } }, { new: true }
      );
      if (!item) return res.status(404).json({ success: false, message: `${modelName} not found.` });
      await AuditLog.create({
        userId: req.user._id, userEmail: req.user.email, action: 'restore',
        model: modelName, recordId: req.params.id,
        summary: `Restored ${modelName}: ${item.name || item.title || item._id}`,
      });
      return res.status(200).json({ success: true, data: item });
    } catch (err: any) {
      return res.status(500).json({ success: false, message: err.message });
    }
  };

  const reorder = async (req: any, res: Response) => {
    try {
      const { items } = req.body; // [{ id, order }]
      if (!Array.isArray(items)) {
        return res.status(400).json({ success: false, message: 'items array required.' });
      }
      await Promise.all(items.map(({ id, order }: { id: string; order: number }) =>
        Model.findByIdAndUpdate(id, { order })
      ));
      await AuditLog.create({
        userId: req.user._id, userEmail: req.user.email, action: 'reorder',
        model: modelName, summary: `Reordered ${modelName} items`,
      });
      return res.status(200).json({ success: true, message: 'Order updated.' });
    } catch (err: any) {
      return res.status(500).json({ success: false, message: err.message });
    }
  };

  const publish = async (req: any, res: Response) => {
    try {
      const item = await Model.findByIdAndUpdate(
        req.params.id, { isPublished: true, status: 'published', publishedAt: new Date() }, { new: true }
      );
      if (!item) return res.status(404).json({ success: false, message: `${modelName} not found.` });

      // Trigger Next.js revalidation
      const revalidateUrl = `${process.env.CLIENT_URL || 'http://localhost:3000'}/api/revalidate`;
      try {
        await fetch(revalidateUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ secret: process.env.REVALIDATION_SECRET, tags: ['all'] }),
        });
      } catch (_) { /* revalidation not critical */ }

      await AuditLog.create({
        userId: req.user._id, userEmail: req.user.email, action: 'publish',
        model: modelName, recordId: item._id.toString(),
        summary: `Published ${modelName}: ${item.name || item.title || item._id}`,
      });
      return res.status(200).json({ success: true, data: item });
    } catch (err: any) {
      return res.status(500).json({ success: false, message: err.message });
    }
  };

  return { getAll, getById, create, update, remove, restore, reorder, publish };
}
