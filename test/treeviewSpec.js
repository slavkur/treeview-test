define(['jquery', 'underscore', 'treeview'], function($, _, TreeView) {

  describe('just checking', function() {

    var treeview = new TreeView({
      el: $('<div id="treeview-test"><button class="edit">Edit</button><button class="apply">Apply</button>' +
        '<textarea style="display: none;"/><div/></div>'),
      children: [{
        label: 'Element #1',
        children: [{
          label: 'subchild #1'
        }]
      }, {
        label: 'Element #2',
      }, {
        label: 'Element #3',
        children: [{
          label: 'subchild #1',
          children: [{
            label: 'sub subchild #1'
          }]
        }]
      }]
    });
    treeview.render();

    beforeEach(function() {
      window.localStorage['treeview-test'] = '';
    });

    it('works for init', function() {
      expect(treeview.id).toEqual('treeview-test');
      expect(treeview.$el.find('> div').children().length).toEqual(3);
      expect(treeview.$el.find('> div div.nested label:contains(Element #3)').length).toEqual(1);
      expect(treeview.$el.find('> div div.nested:contains(Element #3) div.nested:contains(subchild #1)').length).toEqual(1);
    });

    it('works for storage', function() {
      var html = treeview.$el.html();
      treeview.edit();
      expect(window.localStorage['treeview-test']).not.toBeNull();
      window.localStorage['treeview-test'] += "\nElement";
      treeview.parse();
      expect(html).not.toEqual(treeview.$el.html());
    });

    it('works for buttons and input, open state', function() {
      var html = treeview.$el.html(),
        textarea = treeview.$el.find('textarea');
      expect(textarea.val().length).toEqual(0);
      treeview.editTree();
      expect(textarea.val().length).not.toEqual(0);
      html = textarea.val();
      textarea.val(textarea.val() + "\n-TestElement\n    sub");
      treeview.saveTree();
      expect(window.localStorage['treeview-test']).not.toEqual(html);
      expect(treeview.$el.find('div.nested.open label:contains(TestElement)').length).toEqual(1);
    });

    it('works for underscore', function() {
      // just checking that _ works
      expect(_.size([1,2,3])).toEqual(3);
    });
  });
});
