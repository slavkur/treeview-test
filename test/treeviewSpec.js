define(['jquery', 'underscore', 'treeview'], function($, _, TreeView) {

  describe('just checking', function() {

    var treeview = new TreeView({
      el: $('<div id="treeview-test"><div/></div>'),
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
    });
    treeview.render();

    it('works for init', function() {
      delete window.localStorage['treeview-test'];
      expect(treeview.id).toEqual('treeview-test');
      expect(treeview.children.length).toEqual(3);
    });

    it('works for storage', function() {
      var html = treeview.$el.html();
      delete window.localStorage['treeview-test'];
      treeview.edit();
      expect(window.localStorage['treeview-test']).not.toBeNull();
      window.localStorage['treeview-test'] += "\nElement";
      treeview.parse();
      expect(html).not.toEqual(treeview.$el.html());
    });

    it('works for underscore', function() {
      // just checking that _ works
      expect(_.size([1,2,3])).toEqual(3);
    });
  });
});
