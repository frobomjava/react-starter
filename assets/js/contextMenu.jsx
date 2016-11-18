class ContextMenu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            options: props.options,
            isVisible: false
        };
        this.showMenu = this.showMenu.bind(this);
        this.hideMenu = this.hideMenu.bind(this);
        this.handleLeftClick = this.handleLeftClick.bind(this);
        this.handleRightClick = this.handleRightClick.bind(this);
        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.handleMouseOut = this.handleMouseOut.bind(this);
    }

    showMenu(e) {
        e.preventDefault();
        let scope = this;
        setTimeout(function () {
            scope.setState({isVisible: true});
        }, scope.props.delay);
    }

    hideMenu(e) {
        e.preventDefault();
        this.setState({isVisible: false});
    }

    handleLeftClick(e){
        e.preventDefault();

        if(this.props.trigger && this.props.trigger === 'left') {
            this.showMenu(e);
        }
        else this.state.options.callback(e);
    }

    handleRightClick(e){
        e.preventDefault();

        if(this.props.trigger && this.props.trigger === 'right') {
            this.showMenu(e);
        }

    }

    handleMouseOver(e) {
        e.preventDefault();

        if(this.props.trigger && this.props.trigger === 'hover') {
            this.showMenu(e);
        }
    }

    handleMouseOut(e){
        e.preventDefault();

        if(this.props.trigger && this.props.trigger === 'hover') {
            this.hideMenu(e);
        }
    }

    render() {

        let style = {
            "borderColor": this.props.borderColor,
            "backgroundColor" : this.props.backColor,
            "color" : this.props.color,
            "zIndex": this.props.zIndex
        };

        let menu = this.state.isVisible ? <MenuItems
                                                style={style}
                                                items={this.state.options.items}
                                                hideMenu={this.hideMenu}
                                                autoHide={this.props.autoHide}/> : null;
        return (
            <span
                className={this.state.options.className}
                onClick={this.state.options.callback}
                onContextMenu={this.showMenu}
                onMouseOver={this.handleMouseOver}
                onMouseOut={this.handleMouseOut}
            >
                Right click me
                {menu}
            </span>
        )
    }
}

ContextMenu.propTypes = {
    selector: React.PropTypes.string,
    trigger: React.PropTypes.string,
    className: React.PropTypes.string,

    color: React.PropTypes.string,
    backColor: React.PropTypes.string,
    borderColor: React.PropTypes.string,

    delay: React.PropTypes.number,
    zIndex: React.PropTypes.number,
    position: React.PropTypes.object,

    autoHide: React.PropTypes.bool,

    events: React.PropTypes.object,
    items: React.PropTypes.arrayOf(React.PropTypes.object),

    callback: React.PropTypes.func
};

ContextMenu.defaultProps = {
    selector: 'span.context-menu',
    trigger: 'right', //right, left, hover, none
    className: 'contextmenu-custom',

    color: "#2f2f2f",
    backColor: '#fff',
    borderColor: '#bebebe',

    delay: 200,
    zIndex: 1,
    position: undefined, //offset in pixels from top-left of trigger element.(x, y)

    autoHide: true,

    events: {}, //show, hide
    items: [],

    callback: function(e){
        e.preventDefault();
        alert("Clicked on " + e.target.textContent);
     }
};

class MenuItems extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            items: props.items
        };
        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.handleMouseOut = this.handleMouseOut.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleMouseOver(e){
        e.preventDefault();
        document.body.removeEventListener('click', this.props.hideMenu);
    }

    handleMouseOut(e){
        e.preventDefault();
        document.body.addEventListener('click', this.props.hideMenu);
    }

    handleClick(e){
        e.preventDefault();

        if(this.props.autoHide) {
            this.props.hideMenu(e);
        }
    }

    render() {

        let items = this.state.items.map((item, index) => {
            let icon = item.icon;
            let classes = icon ? ["context-menu-item context-menu-icon context-menu-icon-" + icon] : ["context-menu-item context-menu-separator context-menu-not-selectable"];
            return(
               <li className={classes} onClick={this.handleClick} onMouseOver={this.handleMouseOver} onMouseOut={this.handleMouseOut}  key={index}><span>{item.name}</span></li>
            );
        });

        return (
            <ul className="context-menu-list context-menu-root" style={this.props.style}>
                {items}
            </ul>
        )

    }
}

export default ContextMenu;
