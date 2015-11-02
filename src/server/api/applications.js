import express from 'express';

const router = express.Router();

router.route('/upload')
  .get((req, res, next) => {

    // Simulate async access.
    setTimeout(() => {
      res.status(200).send({}).end();
    }, 50);

  });

export default router;
