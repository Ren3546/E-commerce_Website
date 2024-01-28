const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  Category.findAll({
      include: [{ model: Product }]
    }).then(categoryData => {
      if(!categoryData) {
       return res.status(404).json(`No message exists!`)
      }
      res.json(categoryData)
   }).catch(err => {
       res.status(500).json({msg:`Server Error!`, err});
       console.log(err);
   })
  // be sure to include its associated Products
  

})
router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findByPk(req.params.id, {
    include: [{ model: Product }],
  }).then(categoryData => {
  if(!categoryData) {
   return res.status(404).json(`No message exists!`)
  }
  res.json(categoryData)
}).catch(err => {
   res.status(500).json({msg:`Server Error!`, err});
   console.log(err);
})
});


//create a new category
router.post('/',(req, res) => {
    Category.create({
        id: req.body.id,
        category_name:req.body.category_name, 
      }).then(categoryData => {
        res.json(categoryData)
    }).catch(err => {
        res.status(500).json({msg:`Server error!`,err});
    })
  });


router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(
    {
      category_name:req.body.category_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((updatedCategory) => {
      res.json(updatedCategory);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
      where: {
        id: req.params.id,
      },
    }).then(categoryData => {
      res.json(categoryData)
  }).catch(err => {
      res.status(500).json({msg:`Server error!`,err})
  })
});

module.exports = router;
