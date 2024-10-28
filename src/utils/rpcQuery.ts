export async function rpcQuery(accountId: string, methodName: string, args: object) {
  const bodyContent = JSON.stringify({
    jsonrpc: "2.0",
    id: "dontcare",
    method: "query",
    params: {
      request_type: "call_function",
      finality: "final",
      account_id: accountId,
      method_name: methodName,
      args_base64: Buffer.from(JSON.stringify(args)).toString("base64"),
    },
  });

  console.log({ body: bodyContent });

  try {
    const response = await fetch("https://rpc.mainnet.near.org", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: bodyContent,
    });

    const data = await response.json();
    let deserializedResult;

    if (Array.isArray(data.result.result)) {
      deserializedResult = String.fromCharCode(...data.result.result);
    } else {
      deserializedResult = data.result.result;
    }

    return deserializedResult;
  } catch (error) {
    return {
      error: error,
      status: 500,
      body: { error: "Failed to fetch proposal details" },
    };
  }
}