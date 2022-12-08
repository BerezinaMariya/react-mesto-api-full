const router = require('express').Router();

const { validateUserId, validateUserInfo, validateUserAvatar } = require('../middlewares/validators/validateUserData');

const {
  getUsers,
  getСurrentUser,
  getUserId,
  updateUserInfo,
  updateUserAvatar,
  exit,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getСurrentUser);
router.get('/:userId', validateUserId, getUserId);
router.patch('/me', validateUserInfo, updateUserInfo);
router.patch('/me/avatar', validateUserAvatar, updateUserAvatar);
router.post('/signout', exit);

module.exports = router;
