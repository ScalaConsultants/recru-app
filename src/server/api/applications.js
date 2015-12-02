import express from 'express';

const router = express.Router();

router.route('/upload')
  .post((req, res, next) => {

    // Simulate async access.
    setTimeout(() => {
      res.status(200).send('OK').end();
    }, 100);

  });

export default router;
