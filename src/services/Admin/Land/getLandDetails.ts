
// import fetchListLandData from "./getLandsApi";

// const fetchLandDetails = async ( id : any) => {
//     try {
//         const listLand = await fetchListLandData();
//         listLand.forEach(element => {
//             if (element.id == id) {
//                 return element;
//             }   
//         });
//     } catch (error: unknown) {
//         // Assert the type of error to be an instance of Error
//         if (error instanceof Error) {
//             throw new Error(`Error calling API: ${error.message}`);
//         } else {
//             throw new Error(`Unknown error occurred: ${error}`);
//         }
//     }
// }
// export default fetchLandDetails;