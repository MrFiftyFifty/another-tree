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

// Функция для преобразования дерева в JSON
const treeToJson = (node) => {
  if (node.type === 'file') {
    return {
      type: 'file',
      name: node.name,
    };
  }

  return {
    type: 'directory',
    name: node.name,
    children: node.children.map(treeToJson),
  };
};

// Преобразуем дерево в JSON
const treeJson = treeToJson(tree);

// Выводим дерево в формате JSON
console.log(JSON.stringify(treeJson, null, 2));
