const express = require('express');
const router = express.Router();
const { getGetData, getPostData } = require('../controller/itemController');

// router.get('/', async (req, res) => {
//   try {
//     res.send('<h1>Onboarding task</h1>');
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send('Server Error');
//   }
// });

router.post('/getData', getPostData);
router.get('/getData', getGetData);

module.exports = router;
