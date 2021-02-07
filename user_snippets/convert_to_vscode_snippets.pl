undef $/;
my $line = <DATA>;
while ( $line =~ /!TEXT=(\w+)(.*?)!/msg) {
    my $name = $1;
    my $content = $2;

    # Escape content
    $content =~ s/"/\\"/g;

    # Split the content into lines
    my @lines = split(/\n/,$content);
print <<END1;
  "$name": {
      "prefix": "$name",
      "body": [
END1
    foreach my $line (@lines) {
      print "\t\t\t\"$line\",\n";
    }

print <<END2;
      ],
      "description": ""
  },
END2
}

print "\n";


__DATA__
#!/usr/bin/env perl

use strict;
use warnings;

my $file = shift;

open (my $fh, "< $file") || die "Sorry, I couldn't read $file.\n";

while (<$fh>) {
  print;
}

close $fh;
