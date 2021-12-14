export async function fetchItemInfomation(code) {
    const janCode = code;
    const response = await fetch(`/api/${janCode}`);
    const data = await response.json();
    //data.hits[0].name
    return data;
  }

export async function fetchItemFormat(data){
  const response = await fetch(`/lcs/`,{
    method: "POST",
    body: JSON.stringify(data)
  });
  const format = await response.json();
  return format.name;
}