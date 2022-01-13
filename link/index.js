module.exports = function (context, req) {
    context.log("JavaScript HTTP trigger function processed a request.");
    
    const id = context.bindingData.id;
    const link = context.bindings.links;
    const url = "https://www.tomi.sh/";
    let response = "";

    // temp code just to make sure the id is extracted from request url
    // const responseMessage = `Link ID: ${id}`;
    // context.res = {
    //     body: responseMessage
    // };

    // temp code to help choose what parts to include in the logs
    // context.log("JavaScript queue trigger function processed work item");
    // context.log("========================context========================");
    // context.log(context);
    // context.log("========================req========================");
    // context.log(req);

    if (link) {
        if (link.active) {
            context.log("Link found & active: " + id);
            response = "OK";
            context.res = {
                status: 302,
                headers: {
                    "Location": link.url
                }
            };
        } else {
            context.log("Link found but inactive: " + id);
            response = "Inactive";
            context.res = {
                status: 404,
                body : "Link found but inactive",
                headers: {
                    "Content-Type": "application/json"
                }
            };
        }
    } else {
        context.log("Link not found: " + id);
        response = "Invalid";
        context.res = {
            status: 404,
            body : "Link not found",
            headers: {
                "Content-Type": "application/json"
            }
        };
    }

    // write to table storage log
    // making sure RowKey is unique
    // including the complete context and req objects for now
    context.bindings.logs = {
        PartitionKey: id,
        RowKey: context.bindingData.sys.utcNow + context.bindingData.sys.randGuid,
        Context: JSON.stringify(context),
        Request: JSON.stringify(req),
        Response: response
    };

    context.done();
}
