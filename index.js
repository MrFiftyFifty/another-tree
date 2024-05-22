import { mkfile, mkdir } from '@hexlet/immutable-fs-trees';

// Создаем дерево файлов
const tree = mkdir('nodejs-package', [
  mkfile('Makefile'),
  mkfile('README.md'),
  mkdir('dist'),
  mkdir('_tests_', [mkfile('half.test.js')]),
  mkfile('babel.config.js'),
  mkdir('node_modules', [mkdir('@babel', [mkdir('cli', [mkfile('LICENSE')])])]),
]);

// Выводим дерево в формате JSON
console.log(JSON.stringify(tree, null, 2));

// Реализовать функции подсчета:
// 1. Всех узлов и листьев дерева
const countNodesAndLeaves = (node) => {
  if (node.type === 'file') {
    return 1;
  }
  return 1 + node.children.reduce((acc, child) => acc + countNodesAndLeaves(child), 0);
};

// 2. Только директорий
const countDirectories = (node) => {
  if (node.type === 'file') {
    return 0;
  }
  return 1 + node.children.reduce((acc, child) => acc + countDirectories(child), 0);
};

// 3. Только файлов
const countFiles = (node) => {
  if (node.type === 'file') {
    return 1;
  }
  return node.children.reduce((acc, child) => acc + countFiles(child), 0);
};

// Подсчитываем узлы и листья
const totalNodesAndLeaves = countNodesAndLeaves(tree);
console.log(`Total nodes and leaves: ${totalNodesAndLeaves}`);

// Подсчитываем только директории
const totalDirectories = countDirectories(tree);
console.log(`Total directories: ${totalDirectories}`);

// Подсчитываем только файлы
const totalFiles = countFiles(tree);
console.log(`Total files: ${totalFiles}`);

// Функция для вывода имени директории и количества файлов в ней
const printDirectoryFileCounts = (node, path = '') => {
  if (node.type === 'directory') {
    const fileCount = node.children.filter((child) => child.type === 'file').length;
    console.log(`${path}${node.name}: ${fileCount}`);
    node.children.forEach((child) => printDirectoryFileCounts(child, `${path}${node.name}/`));
  }
};

// Выводим имя директории и количество файлов в ней
printDirectoryFileCounts(tree);
