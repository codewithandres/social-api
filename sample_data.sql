-- Datos de ejemplo para la aplicación de red social
-- Ejecutar después de migration.sql

SET FOREIGN_KEY_CHECKS = 0;

-- Insertar usuarios
INSERT INTO `users` (`username`, `name`, `email`, `password`, `profilePicture`, `bio`) VALUES
('juan_dev', 'Juan Pérez', 'juan@example.com', '$2b$10$hashedpassword1', 'https://picsum.photos/150/150?random=1', 'Desarrollador Full Stack apasionado por la tecnología'),
('maria_design', 'María García', 'maria@example.com', '$2b$10$hashedpassword2', 'https://picsum.photos/150/150?random=2', 'Diseñadora UX/UI creativa'),
('carlos_photo', 'Carlos López', 'carlos@example.com', '$2b$10$hashedpassword3', 'https://picsum.photos/150/150?random=3', 'Fotógrafo profesional'),
('ana_travel', 'Ana Martínez', 'ana@example.com', '$2b$10$hashedpassword4', 'https://picsum.photos/150/150?random=4', 'Viajera y blogger'),
('luis_tech', 'Luis Rodríguez', 'luis@example.com', '$2b$10$hashedpassword5', 'https://picsum.photos/150/150?random=5', 'Ingeniero de software');

-- Insertar posts
INSERT INTO `posts` (`description`, `image`, `userId`) VALUES
('¡Nuevo proyecto terminado! 🚀', 'https://picsum.photos/600/400?random=10', 5),
('Diseño minimalista para una app móvil', 'https://picsum.photos/600/400?random=11', 22),
('Atardecer increíble en la playa 📸', 'https://picsum.photos/600/400?random=12', 27),
('Explorando nuevos destinos ✈️', 'https://picsum.photos/600/400?random=13', 30),
('Código limpio es código feliz 💻', NULL, 5),
('Nueva interfaz de usuario completada', 'https://picsum.photos/600/400?random=14', 5),
('Sesión de fotos urbana', 'https://picsum.photos/600/400?random=15', 5);

-- Insertar comentarios
INSERT INTO `comments` (`description`, `userId`, `postId`) VALUES
('¡Excelente trabajo!', 2, 1),
('Me encanta el diseño', 1, 2),
('Qué foto tan hermosa', 4, 3),
('¿Dónde fue tomada?', 1, 3),
('Totalmente de acuerdo', 3, 5),
('Inspirador como siempre', 5, 4),
('Gran composición', 2, 7);

-- Insertar likes
INSERT INTO `likes` (`userId`, `postId`) VALUES
(1, 2), (1, 3), (1, 4),
(2, 1), (2, 3), (2, 5),
(3, 1), (3, 2), (3, 4),
(4, 1), (4, 2), (4, 3), (4, 5),
(5, 1), (5, 2), (5, 3), (5, 4);

-- Insertar stories
INSERT INTO `stories` (`image`, `expiresAt`, `userId`) VALUES
('https://picsum.photos/400/600?random=20', DATE_ADD(NOW(), INTERVAL 24 HOUR), 1),
('https://picsum.photos/400/600?random=21', DATE_ADD(NOW(), INTERVAL 20 HOUR), 2),
('https://picsum.photos/400/600?random=22', DATE_ADD(NOW(), INTERVAL 18 HOUR), 3),
('https://picsum.photos/400/600?random=23', DATE_ADD(NOW(), INTERVAL 15 HOUR), 4);

-- Insertar follows
INSERT INTO `follows` (`followerId`, `followingId`) VALUES
(1, 2), (1, 3), (1, 4),
(2, 1), (2, 3), (2, 5),
(3, 1), (3, 2), (3, 4),
(4, 1), (4, 2), (4, 3), (4, 5),
(5, 1), (5, 2), (5, 3);

-- Insertar notificaciones
INSERT INTO `notifications` (`type`, `receiverId`, `senderId`) VALUES
('LIKE', 1, 2),
('COMMENT', 2, 1),
('FOLLOW', 3, 1),
('LIKE', 3, 4),
('COMMENT', 1, 3),
('FOLLOW', 1, 4),
('LIKE', 4, 5);

SET FOREIGN_KEY_CHECKS = 1;