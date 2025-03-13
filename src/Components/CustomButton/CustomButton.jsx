import { motion } from "framer-motion"


const CustomButton = ({children, onClick, animationType = "rotate", className}) => {


    return (
        <motion.button
        className={className}
            initial={{
                rotate: "0deg",
                scale: 1
            }}
            whileHover={{
                rotate: animationType == "rotate" ? "10deg" : "0deg",
                scale: animationType == "rotate" ? 1.2 : 1,
                scaleY: animationType == "verticalScale" ? 1.2 : 1
            }}
            whileTap={{
                scale: animationType == "rotate" ? 1.4 : 1.2
            }}
            transition={{
                duration: .6,
                type: "spring"
            }}
            onClick={onClick}
        >
            {children}
        </motion.button>
    )
}


export default CustomButton