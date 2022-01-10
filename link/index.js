module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const id = context.bindingData.id;
    const responseMessage = `Link ID: ${id}`;

    context.res = {
        body: responseMessage
    };
}