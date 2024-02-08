const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  Tag.findAll({
      include: [{ model: Product }]
    }).then(tagData => {
      if(!tagData) {
       return res.status(404).json(`No message exists!`)
      }
      res.json(tagData)
   }).catch(err => {
       res.status(500).json({msg:`Server Error!`, err});
       console.log(err);
   })
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    }).then(tagData => {
    if(!tagData) {
     return res.status(404).json(`No message exists!`)
    }
    res.json(tagData)
 }).catch(err => {
     res.status(500).json({msg:`Server Error!`, err});
     console.log(err);
 })
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
      id: req.body.id,
      tag_name:req.body.tag_name, 
    }).then(tagData => {
      res.json(tagData)
   }).catch(err => {
       res.status(500).json({msg:`Server Error!`, err});
       console.log(err);
   })
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(
    {
      tag_name:req.body.tag_name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((updatedTag) => {
      res.json(updatedTag);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
      where: {
        id: req.params.id,
      },
   }).then(tagData => {
      res.json(tagData)
   }).catch(err => {
       res.status(500).json({msg:`Server Error!`, err});
       console.log(err);
   });
});

module.exports = router;
