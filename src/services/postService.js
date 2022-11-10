import { prisma } from '../repository/dbService.js'

export function getAllPosts() {
    return prisma.posts.findMany()
}

export function getAllPostsBySearch(searchKey) {
    return prisma.posts.findMany({
        where: {
            OR: [
                { title: { contains: searchKey } },
                { description: { contains: searchKey } },
            ],
        },
    })
}

export function getAllPostsByType(requestedType) {
    return prisma.posts.findMany({
        where: {
            type: requestedType,
        },
    })
}

export function getAllPostsByUser(requestedUser) {
    return prisma.posts.findMany({
        where: {
            user: {
                equals: requestedUser,
            },
        },
    })
}

export function getPostById(id) {
    return prisma.posts.findUnique({ where: { id: id } })
}

export function createPost(post) {
    return prisma.posts.create({ data: { ...post } })
}

//Update one post
function updatePost(id, updates) {
    return prisma.posts.update({
        where: {
            id: id,
        },
        data: {
            ...updates,
        },
    })
}

//Delete one post
function deletePost(id) {
    return prisma.posts.delete({
        where: {
            id: id,
        },
    })
}

export default { createPost, updatePost, deletePost }
