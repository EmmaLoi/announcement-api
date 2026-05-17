/**
 * @swagger
 * tags:
 *   name: Announcements
 *   description: API for announcements
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Announcement:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         price:
 *           type: number
 *         category:
 *           type: string
 *           enum: [sale, service, job, other]
 *         contactInfo:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     AnnouncementInput:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - price
 *         - category
 *         - contactInfo
 *       properties:
 *         title:
 *           type: string
 *           minLength: 5
 *           maxLength: 100
 *         description:
 *           type: string
 *           minLength: 10
 *         price:
 *           type: number
 *           minimum: 0.01
 *         category:
 *           type: string
 *           enum: [sale, service, job, other]
 *         contactInfo:
 *           type: string
 *           minLength: 5
 */

/**
 * @swagger
 * /announcements:
 *   get:
 *     summary: Get all announcements
 *     tags: [Announcements]
 *     parameters:
 *       - in: query
 *         name: search
 *         required: false
 *         schema:
 *           type: string
 *         description: Search announcements by title
 *       - in: query
 *         name: sort
 *         required: false
 *         schema:
 *           type: string
 *           enum: [newest, oldest]
 *         description: Sort announcements by creation date
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: Page number
 *     responses:
 *       200:
 *         description: List of announcements with pagination
 */

/**
 * @swagger
 * /announcements/{id}:
 *   get:
 *     summary: Get announcement by id
 *     tags: [Announcements]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *     responses:
 *       200:
 *         description: Announcement found
 *       404:
 *         description: Announcement not found
 */

/**
 * @swagger
 * /announcements:
 *   post:
 *     summary: Create announcement
 *     tags: [Announcements]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AnnouncementInput'
 *     responses:
 *       201:
 *         description: Announcement created
 *       400:
 *         description: Validation error
 */

/**
 * @swagger
 * /announcements/{id}:
 *   patch:
 *     summary: Update announcement
 *     tags: [Announcements]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             minProperties: 1
 *             properties:
 *               title:
 *                 type: string
 *                 minLength: 5
 *                 maxLength: 100
 *               description:
 *                 type: string
 *                 minLength: 10
 *               price:
 *                 type: number
 *                 minimum: 0.01
 *               category:
 *                 type: string
 *                 enum: [sale, service, job, other]
 *               contactInfo:
 *                 type: string
 *                 minLength: 5
 *     responses:
 *       200:
 *         description: Announcement updated
 *       400:
 *         description: Validation error
 *       404:
 *         description: Announcement not found
 */

/**
 * @swagger
 * /announcements/{id}:
 *   delete:
 *     summary: Delete announcement
 *     tags: [Announcements]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *     responses:
 *       204:
 *         description: Announcement deleted
 *       404:
 *         description: Announcement not found
 */

import { Router } from 'express';

import {
    getAnnouncements,
    getAnnouncementById,
    createAnnouncement,
    updateAnnouncement,
    deleteAnnouncement,
} from '../controllers/announcements.controller.js';

import {
    listAnnouncementsValidator,
    idValidator,
    createAnnouncementValidator,
    updateAnnouncementValidator,
} from '../validators/announcements.validators.js';

const router = Router();

router.get('/', listAnnouncementsValidator, getAnnouncements);

router.get('/:id', idValidator, getAnnouncementById);

router.post('/', createAnnouncementValidator, createAnnouncement);

router.patch('/:id', updateAnnouncementValidator, updateAnnouncement);

router.delete('/:id', idValidator, deleteAnnouncement);

export default router;