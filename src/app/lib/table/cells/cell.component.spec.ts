import { CellComponent } from "./cell.component";

describe('CellComponent', () => {
  let component: CellComponent;

  beforeEach(() => {
    component = new CellComponent();
  });

  it('should return column id', () => {
    component.data = { config: { id: 'cell', title: 'Cell', cellComponent: CellComponent }, model: undefined };

    const actual = component.getColumnId();

    expect(actual).toEqual('cell');
  });

  it('should return undefined column id on missing data', () => {
    const actual = component.getColumnId();

    expect(actual).toBeUndefined();
  });

  it('should return cell value', () => {
    component.data = { config: { id: 'cell', title: 'Cell', cellComponent: CellComponent }, model: { cell: 'Test' } };

    const actual = component.getCellValue();

    expect(actual).toEqual('Test');
  });

  it('should return undefined cell value on missing model', () => {
    component.data = { config: { id: 'cell', title: 'Cell', cellComponent: CellComponent }, model: undefined };

    const actual = component.getCellValue();

    expect(actual).toBeUndefined();
  });

  it('should return undefined cell value on missing data', () => {
    const actual = component.getCellValue();

    expect(actual).toBeUndefined();
  });
});
