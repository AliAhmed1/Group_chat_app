import firebase, { firestore } from "../database/firebase";


export const CheckGroupExistsOrNot = async (groupname)=>{
    const evenimentesRef = firestore().collection("publicgroups");
    const query = evenimentesRef.where("groupName", "==", groupname).limit(1);
    return query.get();

}


// .then((snapshot) => {
//     if (!snapshot.empty()) {
//
//     }
// });