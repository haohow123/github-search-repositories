import { cloneElement } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import clsx from "clsx";

import makeStyles from "@material-ui/core/styles/makeStyles";

const slideAnimationDuration = 350;
const useStyles = makeStyles((theme) => {
  const slideTransition = theme.transitions.create("transform", {
    duration: slideAnimationDuration,
    easing: "cubic-bezier(0.35, 0.8, 0.4, 1)",
  });
  return {
    root: {
      display: "block",
      position: "relative",
      overflow: "hidden",
      minWidth: "20px",
      "& > *": {
        position: "absolute",
        top: 0,
        right: 0,
        left: 0,
      },
    },
    "slideEnter-opposite": {
      willChange: "transform",
      transform: "translateY(-100%)",
      // zIndex: 1,
    },
    "slideEnter-reverse": {
      willChange: "transform",
      transform: "translateY(100%)",
      // zIndex: 1,
    },
    slideEnterActive: {
      transform: "translateY(0%)",
      transition: slideTransition,
    },
    slideExit: {
      transform: "translateY(0%)",
    },
    "slideExitActive-opposite": {
      willChange: "transform",
      transform: "translateY(100%)",
      transition: slideTransition,
      // zIndex: 0,
    },
    "slideExitActive-reverse": {
      willChange: "transform",
      transform: "translateY(-100%)",
      transition: slideTransition,
      // zIndex: 0,
    },
  };
});
function SlideTransition(props) {
  const { children, slideDirection, transKey, className, ...other } = props;
  const classes = useStyles();
  const transitionClasses = {
    exit: classes.slideExit,
    enterActive: classes.slideEnterActive,
    enter:
      classes[`slideEnter-${slideDirection ? slideDirection : "opposite"}`],
    exitActive:
      classes[
        `slideExitActive-${slideDirection ? slideDirection : "opposite"}`
      ],
  };
  return (
    <TransitionGroup
      className={clsx(classes.root, className)}
      childFactory={(element) =>
        cloneElement(element, { classNames: transitionClasses })
      }
    >
      <CSSTransition
        mountOnEnter
        unmountOnExit
        key={transKey}
        timeout={slideAnimationDuration}
        classNames={transitionClasses}
        {...other}
      >
        {children}
      </CSSTransition>
    </TransitionGroup>
  );
}
export default SlideTransition;
