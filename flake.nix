{
  description = "clock web application";

  inputs = {
    nixpkgs.url = "nixpkgs/nixos-unstable";
    utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, utils, ... }:
    utils.lib.eachDefaultSystem (system:
      let
        inherit (lib) attrValues;
        lib = nixpkgs.lib;
        pkgs = import nixpkgs { inherit system; };
      in {
        defaultPackage = pkgs.clojure;
        # with pkgs;
        #   (stdenv.mkDerivation {
        #     name = "time";
        #     version = "0.0.1";
        #     src = self;
        #     buildInputs = [ clojure ];
        #     installPhase = ''
        #       clj -m cljs.main -d "out" -c demo.static-website -r
        #     '';
        #   });
        devShell = import ./shell.nix;
      });
}
