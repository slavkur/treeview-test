'use strict';
define([
  "jquery",
  "views/treeview"
], function($, TreeView) {
  new TreeView({
    el: $('#treeview1'),
    children: [{
      label: 'Element #1',
      children: [{
        label: 'subchild #1'
      }]
    }, {
      label: 'Element #2',
    }, {
      label: 'Element #3',
      open: true,
      children: [{
        label: 'subchild #1',
        children: [{
          label: 'sub subchild #1'
        }]
      }]
    }]
  }).render();
});
