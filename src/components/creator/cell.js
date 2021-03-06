import React from 'react';

export default class Cell extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			value: this.props.data && this.props.data.questions && this.props.data.questions[0] && this.props.data.questions[0].text
		};

		this.handleCheckboxToggle = this.handleCheckboxToggle.bind(this);
		this.handleTextboxChange = this.handleTextboxChange.bind(this);
		this.generateColumnLabel = this.generateColumnLabel.bind(this);
	}

	handleCheckboxToggle() {
		this.setState(Object.assign(this.props.data.options, {blank: !this.props.data.options.blank}));
	}

	// Store the text as both question and answer in the qset
	handleTextboxChange(event) {
		let value = event.target.value;

		if (value.length > 36) {
			value = value.slice(0, 36);
		}
		Object.assign(this.props.data.questions[0], {text: value});
		Object.assign(this.props.data.answers[0], {text: value});

		this.setState({
			value: value
		});

	}

	generateColumnLabel(num) {
		if (typeof num !== `number`) {
			console.error(`Error in generateColumnLabel: did not recieve a number`);
			return NaN;
		}

		let cellName = ``;
		let remainder = [];
		if (num <= 0) {
			remainder.push(0);
		}
		else {
			while (num > 0) {
				remainder.push(num % 26);
				num = Math.floor(num / 26) ;
			}
			if (remainder.length > 1) {
				remainder[remainder.length - 1]--;
			}
		}
		for (let i = remainder.length - 1; i >= 0 ; i--) {
			cellName += String.fromCharCode(remainder[i] + 65);
		}
		return cellName;
	}

	render() {
		return (
			<td className={`${this.props.className} ${this.props.data && this.props.data.options.blank ? `hidden-cell` : ``} tableCell`}>
				<div className="cell" row={this.props.row} column={this.props.column} onKeyDown={(e) => {
					// Keyboard controls for table:
					// Alt + PageUp         = Add Column
					// Alt + PageDown       = Remove Column
					// Shift + PageUp       = Add Row
					// Shift + PageDown     = Remove Row
					// Ctrl/Command + Arrow = Move Cell
					e.stopPropagation();
					if (e.key === `PageUp` && e.altKey) {
						this.props.appendColumn();
					}
					else if (e.key === `PageDown` && e.altKey) {
						this.props.removeColumn(this.props.row, this.props.column);
					}
					else if (e.key === `PageUp` && e.shiftKey) {
						this.props.appendRow();
					}
					else if (e.key === `PageDown` && e.shiftKey) {
						this.props.removeRow(this.props.row, this.props.column);
					}
					else if (e.key === `ArrowUp` && (e.ctrlKey || e.metaKey)) {
						this.props.focusOnCell(this.props.row - 1, this.props.column);
					}
					else if (e.key === `ArrowDown` && (e.ctrlKey || e.metaKey)) {
						this.props.focusOnCell(this.props.row + 1, this.props.column);
					}
					else if (e.key === `ArrowLeft` && (e.ctrlKey || e.metaKey)) {
						this.props.focusOnCell(this.props.row, this.props.column - 1);
					}
					else if (e.key === `ArrowRight` && (e.ctrlKey || e.metaKey)) {
						this.props.focusOnCell(this.props.row, this.props.column + 1);
					}
				}}>
					<input
						ref={el => {
							this.props.refsArray[this.props.row][this.props.column] = el;
						}}
						className={`row-${this.props.row} col-${this.props.column}`}
						type="text"
						value={this.state.value}
						onChange={this.handleTextboxChange}
						placeholder={this.props.qset.spreadsheet ? `${this.generateColumnLabel(this.props.column)}${this.props.row + 1}` : ``}
					/>

					<div
						className={`${this.props.hideCellsRandomly ? `` : `checkbox-hidden`} checkbox`}
						onClick={this.handleCheckboxToggle}
					>
						<input
							type="checkbox"
							onKeyDown={(e) => {
								if (e.key === `Enter`) {
									this.handleCheckboxToggle();
								}
							}}
							onChange={() => {}}
							checked={this.props.data && this.props.data.options.blank}
						/>
						Hide
					</div>
				</div>
			</td>
		);
	}
}
