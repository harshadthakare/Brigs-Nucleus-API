import express from "express";
import db from "../db/database";
import Dashboard from "../model/dashboard_model";
import { verifyToken } from "../config/verifyJwtToken";
const router = express.Router();
/**
 * @swagger
 * /dashboard/home:
 *   get:
 *     tags:
 *       -  Dashboard
 *     description: Returns List all Asset And Documents
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Authorization
 *         description: token
 *         in: header
 *         required: true
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Not found
 */
router.get("/home", (req, res, next) => {
    verifyToken(req, res, organizationIdFK => {

        db.query(Dashboard.getAllCounts(organizationIdFK), (err, data) => {
            if (!err) {
                if (data && data.length > 0) {
                    res.status(200).json({
                        "dashboard": data,
                        message: "Total Counts"
                    });
                } else {
                    res.status(404).json({
                        message: "Not found"
                    });
                }
            }
        });
    })
});

module.exports = router;