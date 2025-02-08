const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./app/model/index");
const User = db.user;
const app = express();

app.use(cors({
    origin:"*"
}))

app.use(bodyParser.json({type:'application/json'}));
app.use(bodyParser.urlencoded({extended:true}));
db.mongoose
  .connect(`mongodb://localhost:27017/poTest`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });
app.get('/', (req,res)=>{
    res.send("Welcome to the Po App");
})
app.post('/users', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = new User({ name, email });

    await user.save();

    res.status(201).json({ message: 'User created successfully', user });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
app.get('/users', async (req, res) => {
    try {
      const users = await User.find();
      if (users.length === 0) {
        return res.status(200).json({ success: true, message: 'No users found', data: [] });
      }
      res.status(200).json({ success: true, data: users });
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  });
  


let port = 8000;
app.listen(port,()=>{
    console.log("server is running on port: " + port);
})