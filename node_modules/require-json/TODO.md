Do require-haml, require-ini, etc. with same interface. Finally, write wrapper package "require" that lets you pass the list of file extensions you want to enable.

For example:

require('require')('json haml ini');
