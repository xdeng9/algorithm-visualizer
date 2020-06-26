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

export function merge(arr, lo, mid, hi, arr2, steps) {
    let k = lo;
    let i = lo;
    let j = mid + 1;
    while (i <= mid && j <= hi) {
        steps.push([i, j, 'r']);
        if (arr2[i] <= arr2[j]) {
            steps.push([k, arr2[i], 'g']);
            arr[k++] = arr2[i++];
        } else {
            steps.push([k, arr2[j], 'g']);
            arr[k++] = arr2[j++];
        }
    }
    while (i <= mid) {
        steps.push([i, i, 'r']);
        steps.push([k, arr2[i]], 'g');
        arr[k++] = arr2[i++];
    }
    while (j <= hi) {
        steps.push([j, j, 'r']);
        steps.push([k, arr2[j], 'g']);
        arr[k++] = arr2[j++];
    }
}

function swap(arr, i, j, steps, color) {
    [arr[i], arr[j]] = [arr[j], arr[i]];
    steps.push([i, j, color]);
}