const { User, Basket, Product, Post, PickupPoint, Order } = require('../models/models')
const { body, validationResult } = require('express-validator')

const indexPage = (req, res) => {
    res.render('index', { title: 'манга Дзюндзи Ито' })
}
const biography = (req, res) => {
    res.render('biography', { 'title': 'биография дзюндзи ито' })
}

const auth = (req, res) => {
    if (req.body) {
        User.findOne({ where: { email: req.body.email, password: req.body.password } }).then(userData => {
            if (userData) {
                res.cookie('id', userData.id)
                res.cookie('name', userData.name)
                res.cookie('email', userData.email)
                res.cookie('password', userData.password)
                res.cookie('role', userData.role)
                res.redirect(`/user/${userData.id}`)
            } else {
                //res.send('не найден пользователь')
                res.render('authorization', { 'title': 'авторизация', errVal: true, err: 'пользователь не найден' })
            }
        })
    } else {
        res.send('недостаточно данных')
    }
}

const registration = (req, res) => {
    const err = validationResult(req)
    if (!err.isEmpty()) {
        res.render('registration', { title: 'регистрация', errVal: true, err: err.array() })
    } else {
        User.findAll({ where: { name: req.body.name } }).then(user => {
            if (user.length > 0) {
                console.log(user)
                res.render('registration', { title: 'регистрация', userExists: true, userErr: 'такой пользователь уже существует' })
            } else {
                User.create({
                    name: req.body.name,
                    email: req.body.email,
                    password: req.body.password
                }).then(userData => {
                    res.cookie('id', userData.id)
                    res.cookie('name', userData.name)
                    res.cookie('email', userData.email)
                    res.cookie('password', userData.password)
                    console.log('successfull registration')
                    res.redirect(`/user/${userData.id}`)

                })
            }
        })
    }
}

const userPage = (req, res) => {
    User.findOne({ where: { id: req.params.id } }).then(userData => {
        if (userData) {
            if (req.cookies.id == req.params.id) {
                if (userData.role == 'ADMIN') {
                    res.render('user', { user: userData, title: "профиль", auth: true, adminAccess: true })
                } else {
                    res.render('user', { user: userData, title: "профиль", auth: true, adminAccess: false })
                }
            } else {
                res.render('error')
            }

        }
        else {
            res.render('error')
        }
    })
}

const basketPage = (req, res) => {
    let PI = []
    Basket.findAll({ where: { userId: req.cookies.id } }).then(data => {
        for (let i = 0; i < data.length; i++) {
            PI[PI.length] = data[i].productId
        }
        Product.findAll({ where: { id: PI } }).then(products => {

            PickupPoint.findAll().then((PIP) => {
                if (products.length > 0) {
                    let sumBasket = 0
                    for (let i = 0; i < products.length; i++) {
                        sumBasket += Number(products[i].price)
                    }
                    res.render('basket', { title: 'корзина', products: products, productAvability: true, sumBasket: sumBasket, PIP: PIP })
                } else {
                    console.log('нет товаров')
                    res.render('basket', { title: 'корзина', products: products, productAvability: false })
                }
            })


        })
        //res.render('basket', {products: data})
    })
}

const deleteBasketProduct = (req, res) => {
    Basket.destroy({ where: { userId: req.cookies.id, productId: req.body.productId } }).then(() => {
        console.log(`product ${req.body.productId} (userId=${req.cookies.id}) deleted`)
        res.redirect('/basket')
    })
}

const createOrder = (req, res) => {
    Basket.findAll({ where: { userId: req.cookies.id } }).then(product => {

        for (let i = 0; i < product.length; i++) {
            Order.create({
                status: 'Принято в работу',
                pickuppointId: req.body.PIP,
                userId: req.cookies.id,
                productId: product[i].productId
            })
        }
    }).then(() => {
        // res.redirect(`/user/${req.cookies.id}`)
        res.redirect('/basket')
    })
}

const orderView = (req, res) => {
    Order.findAll({ where: { userId: req.cookies.id } }).then(orders => {

        if (orders.length > 0) {
            let ordersData = []
            for (let i = 0; i < orders.length; i++) {

                Product.findByPk(orders[i].productId).then(product => {

                    PickupPoint.findByPk(orders[i].pickuppointId).then(pip => {

                        let data = {
                            id: product.id,
                            name: product.name,
                            price: product.price,
                            image: product.image,
                            status: orders[i].status,
                            adress: pip.adress
                        }

                        ordersData.push(data)
                        
                    })
                })
            }
            res.render('orders', { title: 'покупки', isEmpty: false, order: ordersData })
        } else {
            res.render('orders', { title: 'покупки', isEmpty: true })
        }

    })
}


const AllPosts = (req, res) => {
    Post.findAll().then(posts => {
        if (posts.length > 0) {
            res.render('posts', { title: 'посты', posts: posts, postNotFound: false })
        } else {
            res.render('posts', { title: 'посты', postNotFound: true })
        }

    })
}

const postId = (req, res) => {
    Post.findByPk(req.params.id).then(data => {
        if (data) {
            res.render('postId', { title: data.title, post: data })
        } else {
            res.render('error')
        }

    })
}


module.exports = { indexPage, biography, auth, registration, userPage, basketPage, AllPosts, postId, deleteBasketProduct, createOrder, orderView }