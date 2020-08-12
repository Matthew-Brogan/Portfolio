const express = require('express')
const bodyParser= require('body-parser')
const nodemailer = require('nodemailer')
const {createServer } = require('http')
const compression = require('compression')
const app = express()
const dev = app.dev('env') !== 'production'
const path = require('path')





    app.disable('x-powered-by')
    app.use(compression())
    app.use(express.static(path.resolve(__dirname, 'build')))

    app.get('*', (req,res)=> {
        res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
    })

    app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false}))

app.post('/api/email',(req,res)=> {
    nodemailer.createTestAccount((err,account)=> {
        const htmlEmail =`<h3> Contact Details</h3>
        <ul>
            <li>Name: ${req.body.name}</li>
            <li>Email: ${req.body.email}</li>
            </ul>

            <h3>Message:</h3>
            <p> ${req.body.message}</p>
            `

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'broganmatt11@gmail.com',
                pass: 'Fuckallu2'
            }

        })  
        let mailOptions = {
            from: req.body.name,
            to: 'broganmatt11@gmail.com',
            replyTo: req.body.email,
            subject: 'New Message',
            text: req.body.message,
            html: htmlEmail

        }  

        transporter.sendMail(mailOptions, (err,info)=>{
            if(err){
                return console.log(err)
            }

            console.log('message sent: %s', info.message) 
            console.log('Message URL: %s', nodemailer.getTestMessageUrl(info))
        })
        
        
    })
})



const normailePort = port => parseInt(port,10)
const Port = normalizePort(process.env.Port || 3001)
const server = createServer(app)
server.listen(Port, () => {console.log('server listening on port ${Port}')})