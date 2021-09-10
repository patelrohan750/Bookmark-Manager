const { getLinkPreview } = require('link-preview-js')


module.exports.fetchDataFromURL = async(url) => {
    const data=await getLinkPreview(url, { timeout: 10000 })
    // console.log(data);
    const title=data.title
    let imageURL='';
    let description='';
    if(!data.images[0]){
         imageURL=data.favicons[0]
    }else{
        imageURL=data.images[0]
    }
    if(!data.description){
        description='...'
    }else{
        description=data.description
    }
    //get hostname
    let domain = (new URL(data.url));
    domain = domain.hostname.replace('www.','');;
    const hostname=domain
    
    return {title,hostname,imageURL,description}
}
