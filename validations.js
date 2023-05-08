import { body } from "express-validator";

export const loginValidation = [
    body('email', 'Неверный формат почты!').isEmail(),
    body('password', 'Пароль должен состоять, как минимум из 5 символов!').isLength({ min: 5 }),
];

export const registerValidation = [
    body('email', 'Неверный формат почты!').isEmail(),
    body('password', 'Пароль должен состоять, как минимум из 5 символов!').isLength({ min: 5 }),
    body('fullName', 'Укажите имя не менее 3 символов!').isLength({ min: 3 }),
    body('avatarUrl', 'Указана некорректная ссылка!').optional().isURL(),
];

export const postCreateValidation = [
    body('title', 'Введите заголовок статьи!').isLength({ min: 3 }).isString(),
    body('text', 'Введите текст статьи!').isLength({ min: 3 }).isString(),
    body('tags', 'Неверный формат тегов (укажите массив)!').optional().isString(),
    body('imageUrl', 'Указана некорректная ссылка!').optional().isString(),
];