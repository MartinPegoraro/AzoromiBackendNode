const { EnvironmentCredentials } = require("aws-sdk")
const aws = require("aws-sdk")

const s3 = new aws.S3({
    accessKeyId: process.env.AWSAccessKeyId,
    secretAccessKey: process.env.AWSSecretKey,
})

async function uploadImg(req, res) {
    //   console.log("uploadImg", req.body)
    //   console.log(req.files.foto)
    const id = req.body.id
    const formato = req.body.formato
    const imagen = req.files.foto.data

    const path = `imgUpload/${id}.${formato}`

    var paramPut = {
        Bucket: "azoromi-img",
        ContentType: "image/jpg",
        ACL: "public-read",
        Key: path, //Aca se coloca el nombre que va a aparecer en s3
        Body: imagen, //Lo que queremos enviar
    }

    s3.putObject(paramPut, (err, data) => {
        if (err) throw err
        console.log(data)
    })

    //   res.send("OK")
}

module.exports = {
    uploadImg,
}