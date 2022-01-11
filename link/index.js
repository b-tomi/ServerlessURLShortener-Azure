module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const id = context.bindingData.id;
    const homePage = "https://www.example.com/";
    const errorPage = "https://www.example.com/";
    const url = "https://www.example.com/";

    // temp code just to make sure the id is extracted from request url
    // const responseMessage = `Link ID: ${id}`;
    // context.res = {
    //     body: responseMessage
    // };

    context.res = {
        status: 302,
        headers: {
            "Location": url
        }
    };
}
