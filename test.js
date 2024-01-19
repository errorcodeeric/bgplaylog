const express = require('express');
const cors = require('cors');

const app = express();

// Use cors middleware with default options (allow all origins)
app.use(cors());

const PORT = process.env.PORT || 3000;

// In-memory data
let items = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
  { id: 3, name: 'Item 3' },
];

// Middleware for parsing JSON requests
app.use(express.json());

// Route to get all items
app.get('/items', (req, res) => {
  res.json(items);
});

let testertext=`
<pre>
// Test with 

// GET
// &lt;url&gt;/items 
// &lt;url&gt;/items/1


//POST
// &lt;url&gt;/items 
// json body in api tester
// {
//    "name": "tester"
// }

//PUT
// &lt;url&gt;/items/1
// json body in api tester
// {
//    "name": "replacedme"
// } 
</pre>
`

app.get('/', (req, res) => {
    res.send(testertext);
  });

// Route to get a specific item by ID
app.get('/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const item = items.find((item) => item.id === itemId);

  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

// Route to create a new item
app.post('/items', (req, res) => {
  const newItem = req.body;
  newItem.id = items.length + 1;
  items.push(newItem);

  res.status(201).json(newItem);
});

// Route to update an existing item by ID
app.put('/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const updatedItem = req.body;
  const index = items.findIndex((item) => item.id === itemId);

  if (index !== -1) {
    items[index] = { ...items[index], ...updatedItem };
    res.json(items[index]);
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
});

// Route to delete an item by ID
app.delete('/items/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  items = items.filter((item) => item.id !== itemId);

  res.json({ message: 'Item deleted successfully' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

