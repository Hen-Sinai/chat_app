module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users", [
      {
        name: "John Doe111",
        password: 'Aa123456',
        phoneNumber: "114-1555533",
        about: "I am a software engineer.",
        profilePicture: "https://example.com/profile-picture.jpg",
      },
      {
        name: "Jane Smith2222",
        password: 'Aa123456',
        phoneNumber: "111-4266012",
        about: "I love hiking and reading.",
        profilePicture: "https://example.com/profile-picture.jpg",
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  },
};

// module.exports = {
//   up: (queryInterface, Sequelize) => {
//     return queryInterface.bulkInsert("Chats", [
//       {
//         id: "123e4567-e89b-12d3-a456-426655440003",
//         name: "John and Jane",
//         profilePicture: "https://example.com/profile-picture.jpg",
//         chatType: "private",
//       },
//       {
//         id: "123e4567-e89b-12d3-a456-426655440005",
//         name: "Group Chat",
//         profilePicture: "https://example.com/profile-picture.jpg",
//         chatType: "group",
//       },
//     ]);
//   },
//   down: (queryInterface, Sequelize) => {
//     return queryInterface.bulkDelete("Chats", null, {});
//   },
// };

// module.exports = {
//   up: (queryInterface, Sequelize) => {
//     return queryInterface.bulkInsert("Messages", [
//       {
//         id: "123e4567-e89b-12d3-a456-426655440002",
//         content: "Hello, how are you?",
//         UserPhoneNumber: "024-4545455",
//         ChatId: "123e4567-e89b-12d3-a456-426655440003",
//       },
//       {
//         id: "123e4567-e89b-12d3-a456-426655440004",
//         content: "I am good, thanks. How about you?",
//         UserPhoneNumber: "024-4545055",
//         ChatId: "123e4567-e89b-12d3-a456-426655440003",
//       },
//     ]);
//   },
//   down: (queryInterface, Sequelize) => {
//     return queryInterface.bulkDelete("Messages", null, {});
//   },
// };


// module.exports = {
//   up: (queryInterface, Sequelize) => {
//     return queryInterface.bulkInsert("UserChats", [
//       {
//         UserPhoneNumber: "024-4545055",
//         ChatId: "123e4567-e89b-12d3-a456-426655440003",
//       },
//       {
//         UserPhoneNumber: "024-4545455",
//         ChatId: "123e4567-e89b-12d3-a456-426655440003",
//       },
//       {
//         UserPhoneNumber: "024-4545055",
//         ChatId: "123e4567-e89b-12d3-a456-426655440005",
//       },
//     ]);
//   },
//   down: (queryInterface, Sequelize) => {
//     return queryInterface.bulkDelete("UsersChats", null, {});
//   },
// };