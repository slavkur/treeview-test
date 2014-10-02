'use strict';
define([
  "jquery",
  "underscore",
  "backbone",
  "hbs!views/templates/treeview"
], function($, _, Backbone, treeviewTemplate) {
  var repeat = function(str, num) {
      var result = "";
      for (var i = 0; i < num; i++) {
        result += str;
      }
      return result;
  };
    
  return Backbone.View.extend({
    tab: '    ',
    
    events: {
       'click .edit': 'editTree',
       'click .apply': 'saveTree'
    },
      
    initialize: function(options) {
      this.children = options.children;
      this.id = options.el.get(0).id;
    },

    render: function() {
      if(window.localStorage[this.id]) {
        this.parse();
      } else {
        this.appendChildren(this.$el.find('> div'), this.children);
      }
    },

    appendChildren: function(parent, children) {
      _.each(children, function(child) {
        var el = parent.append(treeviewTemplate({
          label: child.label
        }));
        if (child.children && child.children.length > 0) {
          el = el.children().last();
          el.addClass('nested');
          el.children().first().on('click', function(e) {
            $(this).parent().toggleClass('open');
          });
          this.appendChildren(el, child.children);
        }
      }, this);
    },

    editTree: function(e) {
      window.localStorage[this.id] = "";
      this.edit(this.$el.find('> div'));
      this.$el.find('textarea').show().val(window.localStorage[this.id]).next().hide();
    },
    
    saveTree: function(e) {
      window.localStorage[this.id] = this.$el.find('textarea').val();
      this.parse();
      this.$el.find('textarea').hide().next().show();
    },

    edit: function(node, tabulation) {
      tabulation = tabulation || "";
      _.each(node.children(), function(child) {
        if ($(child).get(0).tagName.toLowerCase() !== 'label') {
          window.localStorage[this.id] += tabulation + ($(child).hasClass('open') ? '-' : '') + $(child).children().first().text() + "\n";
        }
        if ($(child).children().length > 1) {
          this.edit($(child), tabulation + this.tab);
        }
      }, this);
    },

    parse: function() {
      var input = "";
      _.each(window.localStorage[this.id].trim().split("\n"), function(child, key, list) {
        var match = child.match(/[ ]{4}/ig),
          prevMatch = list[key - 1] && list[key - 1].match(/[ ]{4}/ig),
          nextMatch = list[key + 1] && list[key + 1].match(/[ ]{4}/ig);
        child = child.trim();
        if (match && prevMatch && match.length < prevMatch.length) {
          input += repeat('</div>', prevMatch.length - match.length + 1) + '<div' + ((nextMatch > match) ? ' class="nested'+ (child[0] === '-' ? ' open"': '"') : '') +'><label>' + child.replace(/^-/m, '') + '</label>';
          if (!nextMatch) {
            input += repeat('</div>', prevMatch.length - match.length + 1);
          }
        } else if (match && nextMatch && nextMatch.length > match.length) {
          input += '<div class="nested'+ (child[0] === '-' ? ' open': '') +'"><label>' + child.replace(/^-/m, '') + '</label>';
        } else if (match && !nextMatch) {
          input += treeviewTemplate({ label: child }) + repeat('</div>', match.length);
        } else if (nextMatch && nextMatch.length) {
          input += '<div' + ((nextMatch && ((match || {}).length || 0) < nextMatch.length) ? ' class="nested' + (child[0] === '-' ? ' open"': '"')  : '') + '><label>' + child.replace(/^-/m, '') + '</label>';
          if (match && nextMatch && match.length === nextMatch.length) {
            input += '</div>';
          }
        } else {
          input += treeviewTemplate({ label: child });
        }
      });
      this.$el.find('> div').html(input);
      this.$el.find('label').on('click', function(e) {
        if($(this).next().length > 0) {
          $(this).parent().toggleClass('open');
        }
      });
    }
  });
});
