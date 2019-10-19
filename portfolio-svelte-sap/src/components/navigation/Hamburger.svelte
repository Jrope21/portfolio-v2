<script>



</script>

<style>

#toggle {
  display: none;
}
#toggle + label {
  position: absolute;
  right: 0;
  width: 1.538rem;
  height: 1.538rem;
  z-index: 50;
  overflow: hidden;
}

/*the nav container (branding / hamburger) is off slighly on tablet -- will need to revisit this*/
@media screen and (min-width: 40em){
  [type=checkbox]+label, [type=radio]+label {
    margin-right: 2rem;
  }
}

#toggle + label .hamburger:before,
#toggle + label .hamburger:after,
#toggle + label .hamburger .middle {
  content: "";
  display: block;
  height: 2px;
  width: 100%;
  position: absolute;
  left: 0;
  -webkit-transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out;
  -ms-transition: all 0.3s ease-in-out;
  -o-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
  background-color: black;
  -webkit-transform: rotate(0);
  -ms-transform: rotate(0);
  -o-transform: rotate(0);
  transform: rotate(0);
}
#toggle + label .hamburger:before {
  -webkit-transform-origin: top left;
  -moz-transform-origin: top left;
  -ms-transform-origin: top left;
  -o-transform-origin: top left;
  transform-origin: top left;
}
#toggle + label .hamburger:after {
  top: auto;
  bottom: 0.35rem;
  -webkit-transform-origin: bottom left;
  -moz-transform-origin: bottom left;
  -ms-transform-origin: bottom left;
  -o-transform-origin: bottom left;
  transform-origin: bottom left;
}
#toggle + label .hamburger .middle {
  width: 88%;
  top: 0.50rem;
}
#toggle:checked + label .hamburger:before {
  left: 0.1rem;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  -o-transform: rotate(45deg);
  transform: rotate(45deg);
}
#toggle:checked + label .hamburger:after {
  left: 0.1rem;
  -webkit-transform: rotate(-45deg);
  -ms-transform: rotate(-45deg);
  -o-transform: rotate(-45deg);
  transform: rotate(-45deg);
}
#toggle:checked + label .hamburger .middle {
  left: -100%;
}
#toggle:checked + label + .main-navigation-wrapper {
  opacity: 1;
}
.show-for-sr {
  border: 0;
  clip: rect(1px, 1px, 1px, 1px);
  clip-path: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
  word-wrap: normal !important;
}
</style>

<input id="toggle" type="checkbox" class="hide subnav-toggle hide-for-xlg">
<label id="nav-label" for="toggle" class="hide-for-xlg">
<span class="show-for-sr">Navigation</span>
    <span class="hamburger" title="Navigation">
        <span class="middle"></span>
    </span>
</label>