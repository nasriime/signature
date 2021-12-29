import { NextFunction, Request, Response } from 'express';
import Singature from '../models/singature';

const getAllSingatures = (req: Request, res: Response, next: NextFunction) => {
    Singature.find()
        .exec()
        .then((singatures) => {
            return res.status(200).json({
                singatures,
                count: singatures.length
            });
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

const getOneSingature = (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    Singature.findById(id)
        .then((result) => {
            if (!result) {
                return res.status(404).send({ message: 'Not found singature with id ' + id });
            } else {
                return res.status(201).json({
                    singature: result
                });
            }
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

const createSingature = async (req: Request, res: Response, next: NextFunction) => {
    let { label, type, counter } = req.body;
    const singature = new Singature({
        label,
        type,
        counter
    });

    return singature
        .save()
        .then((result) => {
            return res.status(201).json({
                singature: result
            });
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

const updateSingature = (req: Request, res: Response, next: NextFunction) => {
    if (!req.body) {
        return res.status(400).send({
            message: 'Data to update can not be empty!'
        });
    }
    let { label, type, counter } = req.body;
    const id = req.params.id;

    Singature.findOneAndUpdate({ id }, { $set: { label, type, counter } }, { new: true })
        .then((result) => {
            return res.status(200).json({
                singature: result
            });
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

const deleteSingature = (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    Singature.findOneAndRemove({ id })
        .then((result) => {
            if (!result) {
                res.status(404).send({
                    message: `Cannot delete singature with id=${id}. Maybe singature was not found!`
                });
            } else {
                return res.status(200).send({
                    message: 'Singature was deleted successfully!'
                });
            }
        })
        .catch((error) => {
            return res.status(500).json({
                message: error.message,
                error
            });
        });
};

export default {
    getAllSingatures,
    getOneSingature,
    createSingature,
    updateSingature,
    deleteSingature
};
