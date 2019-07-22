import { h, Component } from 'preact'

export default WrappedComponent =>
  class WithCrossDeviceWhenNoCamera extends Component {

    componentDidMount() {
      this.attemptForwardToCrossDevice()
    }

    componentDidUpdate(prevProps) {
      const propsWeCareAbout = ["useWebcam", "hasCamera", "allowCrossDeviceFlow", "forceCrossDevice"]
      const propsHaveChanged = propsWeCareAbout
        .some(propKey => prevProps[propKey] !== this.props[propKey])

      if (propsHaveChanged) {
        this.attemptForwardToCrossDevice(this.props)
      }
    }

    attemptForwardToCrossDevice = (props = this.props) => {
      const { useWebcam, hasCamera, forceCrossDevice, allowCrossDeviceFlow, changeFlowTo } = props
      const shouldUseCamera = useWebcam && hasCamera === false

      if (allowCrossDeviceFlow && (shouldUseCamera || forceCrossDevice)) {
        changeFlowTo('crossDeviceSteps', 0, true)
      }
    }

    render() {
      return <WrappedComponent {...this.props} />
    }
  }
