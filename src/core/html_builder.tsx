export function convertStyleFormat ( members )
{
	let result = "";
	Object.keys( members ).forEach( element =>
	{
		result += `${ element.replace( "_", "-" ) } : ${ members[ element ] }; `;
	} );
	return result;
}
export class BaseComponent
{
	component_type: string;
	id: any;
	private _class: any;
	style: string;
	children: any;
	result_str: string;
	constructor ( {
		component_type = "div",
		id, style = convertStyleFormat( {} ), _class,
		children
	} )
	{
		this.component_type = component_type;
		this.id = id;
		this._class = _class;
		this.style = style;
		this.children = children;
		this.result_str = "";
	}

	appendChild ( child )
	{
		if ( typeof ( this.children ) == "object" ) this.children.push( child );
		else
		{
			let old = this.children;
			this.children = [];
			if ( old ) this.children.push( old );
			this.children.push( child );
		} 
	}
	addStyle ()
	{
		if ( this.style ) this.result_str += ` style="${ this.style }"`;
	}
	addId ()
	{
		if ( this.id ) this.result_str += ` id="${ this.id }"`;
	}
	addClass ()
	{
		if ( this._class ) this.result_str += ` class="${ this._class }"`;
	}
	addOpen ()
	{
		this.result_str += `<${ this.component_type } `;
	}
	addChilren ()
	{
		var is_first = true;
		if ( !this.children ) return;
		if ( typeof ( this.children ) == "object" )
			this.children.forEach( element =>
			{
				if ( !is_first ) this.result_str += "\n";
				is_first = false;
				this.result_str += element.toString();
			} );
		else this.result_str += this.children.toString();
	}
	addClose ()
	{
		this.result_str += `</${ this.component_type }>`;
	}
	addBasic ()
	{
		this.addId();
		this.addClass();
	}
	addModify () { }
	toString ()
	{
		this.addOpen();
		this.addBasic();
		this.addStyle();
		this.addModify();
		this.result_str += ">"
		this.addChilren();
		this.addClose();
		return this.result_str;
	}
}
export class Div extends BaseComponent
{
	role: any;
	data_url: any;
	constructor ( props )
	{
		super( { ...props, component_type: "div" } );
		this.role = props.role;
		this.data_url = props.data_url;
	}
	addModify ()
	{
		if ( this.role ) this.result_str += ` role= "${ this.role }"`;
		if ( this.data_url ) this.result_str += ` data-url= "${ this.data_url }"`;
	}
}

export class A extends BaseComponent
{
	href: any;
	constructor ( props )
	{
		super( { ...props, component_type: "a" } );
		this.href = props.href;
	}
	addHref ()
	{
		if ( this.href ) this.result_str += ` href= "${ this.href }"`;
	}
	addModify ()
	{
		this.addHref();
	}
}
export class Img extends BaseComponent
{
	src: any;
	constructor ( props )
	{
		super( { ...props, component_type: "img" } );
		this.src = props.src;
	}
	addSrc ()
	{
		if ( this.src ) this.result_str += ` src= "${ this.src }"`;
	}
	addModify ()
	{
		this.addSrc();
	}
}

export class TD extends BaseComponent
{
	constructor ( props )
	{
		super( { ...props, component_type: "td" } );
	}
}
export class TR extends BaseComponent
{
	constructor ( props )
	{
		super( { ...props, component_type: "tr" } );
	}
}
export class Table extends BaseComponent
{
	border: any;
	constructor ( props )
	{
		super( { ...props, component_type: "table" } );
		this.border = props.border;
	}
	addBorder ()
	{
		if ( this.border ) this.result_str += ` border= "${ this.border }"`;
	}
	addModify ()
	{
		this.addBorder();
	}
}
export class Button extends BaseComponent
{
	constructor ( props )
	{
		super( { ...props, component_type: "button" } );
	}
}
export class Input extends BaseComponent
{
	type: any;
	value: any;
	autocomplete: any;
	placeholder: any;
	constructor ( props )
	{
		super( { ...props, component_type: "input" } );
		this.type = props.type;
		this.value = props.value;
		this.autocomplete = props.autocomplete;
		this.placeholder = props.placeholder;
	}
	addModify ()
	{
		if ( this.type ) this.result_str += ` type= "${ this.type }"`;
		if ( this.value ) this.result_str += ` value= "${ this.value }"`;
		if ( this.autocomplete ) this.result_str += ` autocomplete= "${ this.autocomplete }"`;
		if ( this.placeholder ) this.result_str += ` placeholder= "${ this.placeholder }"`;
	}
}
export class Span extends BaseComponent
{
	isaff: any;
	data_target: any;
	data_code: any;
	constructor ( props )
	{
		super( { ...props, component_type: "span" } );
		this.isaff = props.isaff;
		this.data_target = props.data_target;
		this.data_code = props.data_code;
	}
	addModify ()
	{
		if ( this.isaff ) this.result_str += ` isaff= "${ this.isaff }"`;
		if ( this.data_target ) this.result_str += ` data-target= "${ this.data_target }"`;
		if ( this.data_code ) this.result_str += ` data-code= "${ this.data_code }"`;
	}
} 
