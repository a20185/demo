export default {
    'GETFILE': jest.fn(
        () => new Promise(
            (resolve) => resolve(
                {
                    "data": [{
                        "id": 1,
                        "name": "test",
                        "isDir": true,
                        "children": [
                            { "id": 123, "name": "firstFile", "isDir": false, "children": [] }
                        ]
                    }, {
                        "id": 2,
                        "name": "test2",
                        "isDir": false,
                        "children": []
                    }, {
                        "id": 3,
                        "name": "test3",
                        "isDir": true,
                        "children": [
                            { "id": 124, "name": "seconds", "isDir": false, "children": [] },
                            { "id": 1242, "name": "third", "isDir": false, "children": [] },
                            { "id": 1243, "name": "fourth", "isDir": true, "children": [{ "id": 1232, "name": "sss", "isDir": false, "children": [] }] },
                            { "id": 1244, "name": "fifth", "isDir": false, "children": [] }
                        ]
                    }, {
                        "id": 5,
                        "name": "同时是",
                        "isDir": true,
                        "children": [
                            { "id": 125, "name": "sdad", "isDir": false, "children": [] }
                        ]
                    }, {
                        "id": 7,
                        "name": "热热热",
                        "isDir": true,
                        "children": [
                            { "id": 126, "name": "feefef", "isDir": false, "children": [] }
                        ]
                    }, {
                        "id": 188,
                        "name": "而儿童",
                        "isDir": true,
                        "children": [
                            { "id": 127, "name": "sss", "isDir": false, "children": [] }
                        ]
                    }]
                }
            )
        )
    )
}