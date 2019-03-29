// const { getDB } = require('radiks-server');
// const { mongoURI } = require('../config/keys');
// const { lookupProfile } = require('blockstack')

// const migrate = async () => {
//     const mongo = await getDB(mongoURI)
//     const radiksCollection = mongo.collection('my-block-space')
//     const users = await radiksCollection.find({ radiksType: 'BlockstackUser' })
//     const usersArray = await users.toArray()

//     for (user of usersArray) {
//         try {
//             if (!user.profileImgUrl) {
//                 const profile = await lookupProfile(user.username)
//                 const profileImgUrl = profile.image[0].contentUrl
//                 await radiksCollection.update({
//                     radiksType: 'BlockstackUser',
//                     username: user.username
//                 }, {
//                         $set: {
//                             profileImgUrl: profileImgUrl
//                         }
//                     })
//             }
//         } catch (e) {
//             console.log(user.username)
//             console.log(e.message)
//         }
//     }
// }

// migrate().then(() => {
//     console.log('Done')
//     process.exit()
// }).catch((error) => {
//     console.error(error)
//     throw new Error(error.message)
// })