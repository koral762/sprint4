import { utils } from './utils-service'

export const boardService = {
  getBoardById,
  updateBoard,
  createActivity
}

var gBoard = {
  "_id": "5f72ea5a1ab1fc0017450368",
  "title": "Groceries",
  "isArchived": false,
  "description": "Board's description",
  "labels": [
    {
      "id": "l101",
      "name": "Supermarket",
      "color": "green"
    },
    {
      "id": "l102",
      "name": "Drugstore",
      "color": "yellow"
    },
    {
      "id": "l103",
      "name": "Butcher",
      "color": "orange"
    },
    {
      "id": "l104",
      "name": "Default",
      "color": "red"
    },
    {
      "id": "l105",
      "name": "Default",
      "color": "purple"
    },
    {
      "id": "l106",
      "name": "Default",
      "color": "blue"
    }
  ],
  "activities": [
    {
      "id": "0ahWTxOiG0",
      "txt": "moved the card",
      "commentTxt": "",
      "createdAt": 1601367036803,
      "byMember": {
        "_id": "5f6a2528973d861c5d78c355",
        "fullName": "Amir Asdasd",
        "imgUrl": "https://res.cloudinary.com/dyslqd6pn/image/upload/v1601365356/tx2jp0nl1ruofyhbdrnv.webp"
      },
      "card": {
        "id": "sqLbqQkTgF",
        "title": "Shaving cream"
      },
      "group": {

      }
    },
    {
      "id": "sg4pQVwZVM",
      "txt": "moved the card",
      "commentTxt": "",
      "createdAt": 1601367032102,
      "byMember": {
        "_id": "5f6a2528973d861c5d78c355",
        "fullName": "Amir Asdasd",
        "imgUrl": "https://res.cloudinary.com/dyslqd6pn/image/upload/v1601365356/tx2jp0nl1ruofyhbdrnv.webp"
      },
      "card": {
        "id": "VfaJaRMYrh",
        "title": "Soap"
      },
      "group": {

      }
    },
    {
      "id": "tkdxhcdwoN",
      "txt": "create this card",
      "commentTxt": "",
      "createdAt": 1601366968534,
      "byMember": {
        "_id": "5f6a2528973d861c5d78c328",
        "fullName": "Fernando Chaves",
        "imgUrl": "https://res.cloudinary.com/dyslqd6pn/image/upload/v1601365537/rnymwcd6hepeuvw6domo.jpg"
      },
      "card": {
        "id": "sqLbqQkTgF",
        "title": "Shaving cream"
      },
      "group": {

      }
    },
    {
      "id": "pHV1hzMBoy",
      "txt": "create this card",
      "commentTxt": "",
      "createdAt": 1601367016951,
      "byMember": {
        "_id": "5f6a2528973d861c5d78c328",
        "fullName": "Fernando Chaves",
        "imgUrl": "https://res.cloudinary.com/dyslqd6pn/image/upload/v1601365537/rnymwcd6hepeuvw6domo.jpg"
      },
      "card": {
        "id": "N4y9h6sJxd",
        "title": "Rice"
      },
      "group": {

      }
    }
  ],
  "createdBy": {
    "_id": "u101",
    "fullName": "Abi Abambi",
    "imgUrl": "http://some-img"
  },
  "style": {
    "id": "bs106",
    "fontClr": "#f9f9f9",
    "bgImg": "url(https://res.cloudinary.com/duhz8ymod/image/upload/v1600708669/bg-6_tsrunp.jpg)"
  },
  "members": [
    {
      "_id": "5f6a2528973d861c5d78c355",
      "fullName": "Amir Asdasd",
      "imgUrl": "https://res.cloudinary.com/dyslqd6pn/image/upload/v1601365356/tx2jp0nl1ruofyhbdrnv.webp"
    },
    {
      "_id": "5f6a2528973d861c5d78c328",
      "fullName": "Fernando Chaves",
      "imgUrl": "https://res.cloudinary.com/dyslqd6pn/image/upload/v1601365537/rnymwcd6hepeuvw6domo.jpg"
    },
    {
      "_id": "u101",
      "fullName": "Abi Abambi",
      "imgUrl": "http://some-img"
    }
  ],
  "groups": [
    {
      "id": "yS0BIH6hb0",
      "title": "To Buy",
      "description": "description",
      "archivedAt": false,
      "labels": [

      ],
      "cards": [
        {
          "id": "9LCF8f9WKY",
          "title": "Milk",
          "description": "",
          "archivedAt": null,
          "members": [

          ],
          "labels": [
            {
              "id": "l101"
            }
          ],
          "createdAt": 1601366751048,
          "dueDate": null,
          "attachments": null,
          "timeAnalysis": {
            "timeInGroupsMap": {

            },
            "currGroup": {
              "groupId": "yS0BIH6hb0",
              "enteredAt": 1601366751048
            }
          },
          "byMember": {

          }
        },
        {
          "id": "mz33pnpBNd",
          "title": "Sugar",
          "description": "",
          "archivedAt": null,
          "members": [
            {
              "_id": "5f6a2528973d861c5d78c355",
              "fullName": "Amir Asdasd",
              "imgUrl": "https://res.cloudinary.com/dyslqd6pn/image/upload/v1601365356/tx2jp0nl1ruofyhbdrnv.webp"
            }
          ],
          "labels": [
            {
              "id": "l101"
            }
          ],
          "createdAt": 1601366757216,
          "dueDate": null,
          "attachments": null,
          "timeAnalysis": {
            "timeInGroupsMap": {

            },
            "currGroup": {
              "groupId": "yS0BIH6hb0",
              "enteredAt": 1601366757216
            }
          },
          "byMember": {

          }
        },
        {
          "id": "yYM2GKD7da",
          "title": "Bread",
          "description": "",
          "archivedAt": null,
          "members": [

          ],
          "labels": [
            {
              "id": "l101"
            }
          ],
          "createdAt": 1601366761959,
          "dueDate": null,
          "attachments": null,
          "timeAnalysis": {
            "timeInGroupsMap": {

            },
            "currGroup": {
              "groupId": "yS0BIH6hb0",
              "enteredAt": 1601366761959
            }
          },
          "byMember": {

          }
        },
        {
          "id": "QqCMNb9XNB",
          "title": "Goldstar",
          "description": "",
          "archivedAt": null,
          "members": [

          ],
          "labels": [
            {
              "id": "l101"
            }
          ],
          "createdAt": 1601366773657,
          "dueDate": null,
          "attachments": null,
          "timeAnalysis": {
            "timeInGroupsMap": {

            },
            "currGroup": {
              "groupId": "yS0BIH6hb0",
              "enteredAt": 1601366773657
            }
          },
          "byMember": {

          }
        },
        {
          "id": "XHygDINBkE",
          "title": "Broccoli",
          "description": "ASD",
          "archivedAt": null,
          "members": [

          ],
          "labels": [
            {
              "id": "l101"
            }
          ],
          "createdAt": 1601366855608,
          "dueDate": null,
          "attachments": null,
          "timeAnalysis": {
            "timeInGroupsMap": {

            },
            "currGroup": {
              "groupId": "yS0BIH6hb0",
              "enteredAt": 1601366855608
            }
          },
          "byMember": {

          }
        },
        {
          "id": "N4y9h6sJxd",
          "title": "Rice",
          "description": "",
          "archivedAt": null,
          "members": [

          ],
          "labels": [
            {
              "id": "l101"
            }
          ],
          "createdAt": 1601367016951,
          "dueDate": null,
          "attachments": null,
          "timeAnalysis": {
            "timeInGroupsMap": {

            },
            "currGroup": {
              "groupId": "yS0BIH6hb0",
              "enteredAt": 1601367016951
            }
          },
          "byMember": {

          }
        }
      ]
    },
    {
      "id": "gadsgzZR",
      "title": "In store",
      "cards": [

      ],
      "archivedAt": 1601366705334,
      "style": {

      }
    },
    {
      "id": "Fb1Jainb",
      "title": "Have It Already",
      "cards": [
        {
          "id": "0t32Ec5gDS",
          "title": "Chicken",
          "description": "",
          "archivedAt": null,
          "members": [

          ],
          "labels": [
            {
              "id": "l103"
            }
          ],
          "createdAt": 1601366763127,
          "dueDate": null,
          "attachments": null,
          "timeAnalysis": {
            "timeInGroupsMap": {
              "yS0BIH6hb0": 28761
            },
            "currGroup": {
              "groupId": "Fb1Jainb",
              "enteredAt": 1601366791888
            }
          },
          "byMember": {

          }
        },
        {
          "id": "Wk22cQhbja",
          "title": "Eggs",
          "description": "",
          "archivedAt": null,
          "members": [

          ],
          "labels": [
            {
              "id": "l101"
            }
          ],
          "createdAt": 1601366769311,
          "dueDate": null,
          "attachments": null,
          "timeAnalysis": {
            "timeInGroupsMap": {
              "yS0BIH6hb0": 24727
            },
            "currGroup": {
              "groupId": "Fb1Jainb",
              "enteredAt": 1601366794038
            }
          },
          "byMember": {

          }
        },
        {
          "id": "oXYSdKpZxz",
          "title": "Garlic",
          "description": "",
          "archivedAt": null,
          "members": [

          ],
          "labels": [
            {
              "id": "l101"
            }
          ],
          "createdAt": 1601366866007,
          "dueDate": null,
          "attachments": null,
          "timeAnalysis": {
            "timeInGroupsMap": {
              "yS0BIH6hb0": 164360
            },
            "currGroup": {
              "groupId": "Fb1Jainb",
              "enteredAt": 1601367030367
            }
          },
          "byMember": {

          }
        },
        {
          "id": "VfaJaRMYrh",
          "title": "Soap",
          "description": "",
          "archivedAt": null,
          "members": [

          ],
          "labels": [
            {
              "id": "l102"
            }
          ],
          "createdAt": 1601366963901,
          "dueDate": null,
          "attachments": null,
          "timeAnalysis": {
            "timeInGroupsMap": {
              "yS0BIH6hb0": 68200
            },
            "currGroup": {
              "groupId": "Fb1Jainb",
              "enteredAt": 1601367032101
            }
          },
          "byMember": {

          }
        },
        {
          "id": "sqLbqQkTgF",
          "title": "Shaving cream",
          "description": "",
          "archivedAt": null,
          "members": [

          ],
          "labels": [
            {
              "id": "l102"
            }
          ],
          "createdAt": 1601366968534,
          "dueDate": null,
          "attachments": null,
          "timeAnalysis": {
            "timeInGroupsMap": {
              "yS0BIH6hb0": 68268
            },
            "currGroup": {
              "groupId": "Fb1Jainb",
              "enteredAt": 1601367036802
            }
          },
          "byMember": {

          }
        }
      ],
      "archivedAt": false,
      "style": {

      }
    }
  ]
}

function getBoardById() {
  return Promise.resolve(gBoard)
}



async function updateBoard(newBoard) {
  gBoard=newBoard;
  return Promise.resolve(gBoard)  
  // return await httpService.put(`board/${boardId}`, board)
}

function createActivity(partialActivity) {
  // const user = userService.getLoggedInUser()

  const activity = {
      "id": utils.makeId(),
      "txt": partialActivity.txt,
      "commentTxt": partialActivity.commentTxt,
      "createdAt": Date.now(),
      // "byMember": {
      //     "_id": user._id,
      //     "fullName": user.fullName,
      //     "imgUrl": user.imgUrl
      // }
  }
  if (partialActivity.card) {
      activity.card = {
          "id": partialActivity.card.id,
          "title": partialActivity.card.title
      }
  }
  if (!partialActivity.group) {
      activity.group = {...partialActivity.group}
  }

  return activity
}