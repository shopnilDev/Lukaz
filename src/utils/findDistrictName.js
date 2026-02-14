export const findDistrictName=(data)=>{
return data.map((item,i)=>item?.name)
}


export const findThanaNames=(data)=>{
return data.map((item,i)=>item?.name)
}

export function findByName(items, name) {
  
  return items.find(
    (item) => item.name.toLowerCase() === name.toLowerCase()
  ) || null;
  
}

export const findCountryName=(data)=>{
return data.map((item,i)=>item?.name)
}