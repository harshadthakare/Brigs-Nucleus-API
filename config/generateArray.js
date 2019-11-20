
const generateCatArray=( mArray, callback)=> {
    let mNewArray = []
    let childs = []
    for (let index = 0; index < mArray.length; index++) {
        var element = mArray[index];
        getCatChild(element, mArray, (result) => {
            element.childData = result
            if (result.length > 0) {
                let mSubChild = []
                for (let index = 0; index < result.length; index++) {
                    var element1 = result[index];
                    getCatChild(element1, mArray, (result1) => {
                        element1.childData = result1
                        mSubChild.push(element1)
                    })
                    element1.childData = mSubChild
                    childs.push(element1)
                }
            }
            if (!childs.includes(element)) {
                mNewArray.push(element)
            }
            if (index == mArray.length - 1) {
                callback(mNewArray)
            }
        })
    }
}

function getCatChild(element, mArray, callback) {
    let child = []
    for (let index1 = 0; index1 < mArray.length; index1++) {
        const element1 = mArray[index1];
        if (element.categoryId == element1.parentId && element1.categoryId != element1.parentId) {
            child.push(element1)
        }
    }
    callback(child)
}


const generateDeptArray=( mArray, callback)=> {
    let mNewArray = []
    let childs = []
    for (let index = 0; index < mArray.length; index++) {
        var element = mArray[index];
        getChild(element, mArray, (result) => {
            element.childData = result
            if (result.length > 0) {
                let mSubChild = []
                for (let index = 0; index < result.length; index++) {
                    var element1 = result[index];
                    getChild(element1, mArray, (result1) => {
                        element1.childData = result1
                        mSubChild.push(element1)
                    })
                    element1.childData = mSubChild
                    childs.push(element1)
                }
            }
            if (!childs.includes(element)) {
                mNewArray.push(element)
            }
            if (index == mArray.length - 1) {
                callback(mNewArray)
            }
        })
    }
}

function getChild(element, mArray, callback) {
    let child = []
    for (let index1 = 0; index1 < mArray.length; index1++) {
        const element1 = mArray[index1];
        if (element.departmentId == element1.parentId && element1.departmentId != element1.parentId) {
            child.push(element1)
        }
    }
    callback(child)
}
module.exports = {generateCatArray, generateDeptArray}