export function partition(arr, i, j, steps) {
    let pivot = arr[j];
    let pivotIndex = j;
    j--;
    while (i <= j) {
        if (arr[i] > pivot && arr[j] < pivot) {
            swap(arr, i, j, steps, 'r');
            i++;
            j--;
        } else if (arr[i] <= pivot) i++;
        else j--;
    }
    swap(arr, i, pivotIndex, steps, 'g');
    return i;
}

function swap(arr, i, j, steps, color) {
    [arr[i], arr[j]] = [arr[j], arr[i]];
    steps.push([i, j, color]);
}