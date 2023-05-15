const router = require('express').Router();
const { getideas, idea2 } = require('../../controllers/controller');
const { addcom } = require('../../controllers/Controller');
const { delcom } = require('../../controllers/tController');
const {
  getThoughts: thoughts1,
  
} = require('../../controllers/thoughtController');
const { del1 } = require('../../controllers/userController');



router.route('/').get(thoughts1).post(createThought);


router.route('/:thoughtId').get(getideas).delete(delcom).put(idea2);


router.route('/:thoughtId/reactions').post(addcom);



router.route('/:reactionId/reactions/:reactionId').delete(del1);

module.exports = router;
