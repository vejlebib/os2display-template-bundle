# vejlebib/os2display-template-bundle

Vejlebib templates for os2display.

## Installation

Add the git repository to "repositories" in `composer.json`.

<pre>
"repositories": {
    "vejlebib/os2display-template-bundle": {
      "type": "vcs",
      "url": "https://github.com/vejlebib/os2display-template-bundle"
    },
    ...
}
</pre>

Require the bundle with composer.

<pre>
composer require vejlebib/os2display-template-bundle
</pre>

Enable the bundle in `AppKernel.php`, by adding VejlebibOs2DisplayTemplateBundle to $bundles.

<pre>
new Vejlebib\Os2DisplayTemplateBundle\VejlebibOs2DisplayTemplateBundle()
</pre>

Run os2display:core:templates:load command to load the template in the installation.

<pre>
bin/console os2display:core:templates:load
</pre>
